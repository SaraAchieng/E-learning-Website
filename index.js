// Fetch all courses available in the database
fetch('http://localhost:3000/courses')
.then(response => response.json())
.then((data) => {
    displayCourses(data);
})

// Function to display all courses
function displayCourses(data) {
let cardsContainer = document.getElementById("cardsContainer");
for(course of data){
    cardsContainer.innerHTML +=`
     <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
        <img class="rounded-t-lg" src="${course.image_url}" alt="" />
        </a>
        <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${course.title}</h5>
            <h4 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Duration : ${course.duration} years</h4>

        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${course.description}</p>

        </div>
        <button type="button" onclick="editCourse(${course.id})" class="px-3 text-white bg-green-500 my-2 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
        <button type="button" onclick="deleteCourse(${course.id})"  class="text-white bg-red-500 my-2 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </div>
    `

}
}
// Function to add courses
document.getElementById("form").addEventListener("submit", (event)=>{
    event.preventDefault()
  
    const title = document.getElementById("title").value
    const duration = document.getElementById("duration").value
    const description = document.getElementById("description").value
    const image_url = document.getElementById("image").value
    
  
  
    
    fetch("http://localhost:3000/courses", {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({title: title, duration: duration, description: description, image_url: image_url})
    } )
    .then((data)=> data.json() )
    .then((response)=>{
  
      
      Swal.fire("Course added successfully!");
    })
  
  
  })
  //Function to delete course by id
  function deleteCourse(id)

  {
    fetch(`http://localhost:3000/courses/${id}`, {
      method: "DELETE"
    })
    .then((data)=> data.json())
    .then((courses)=>{

      alert("Course deleted successfully")   
      displayPosts(courses)    
  
    })
  }

  //Function to edit course by id
  function editCourse(id)
  {
    fetch(`http://localhost:3000/courses/${id}`)
    .then((data)=> data.json())
    .then((course)=>{
       const update_container = document.getElementById("update_container")
  
       update_container.innerHTML = `
       <div>  
  <h2 class="text-center font-bold mb-4">Update course </h2>
    <form class="max-w-sm mx-auto w-full" id="form">
      
        <div class="mb-5">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text" value = "${course.title}" id="title_update" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required />
        </div>
        <div class="mb-5">
          <label for="duration" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
          <input type="number" value = "${course.duration}" id="duration_update" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input type="text" value = "${course.description}" id="description_update" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div class="mb-5">
            <label for="image_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <input type="text" value = "${course.image_url}" id="image_update" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>  
        <button type="submit" onclick = "update_course(${id})" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

      </form>
    </div>
       
       `})
  }

//Function to update course by id

  function update_course(id){


    const title = document.getElementById("title_update").value
    const duration = document.getElementById("duration_update").value
    const description = document.getElementById("description_update").value
    const image_url = document.getElementById("image_update").value
    
          fetch(`http://localhost:3000/courses/${id}`, {
            method: "PATCH",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({title: title, duration: duration, description: description, image_url: image_url})
          } )
          .then((data)=> data.json())
          .then((course)=>{
  
            alert("Course updated successfully")
           
          })
  
  
  }

        















