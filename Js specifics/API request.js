const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getTodoItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos?_limit=5`);

    const todoItems = response.data;

    console.log(`GET: Here's the list of todos`, todoItems);

    return todoItems;
  } catch (errors) {
    console.error(errors);
  }
};

let id = null;
let key = null;

function updateID(newID){
    id = newID;
}
function request(key){
    console.log("initializing request...");
    console.log("ID: " + id);
    console.log("Key: " + key);
    

    axios({
        method: 'post',
        url: 'https://api.gumroad.com/v2/licenses/verify',
        data: {
                product_id: id,
                license_key: key,
        }
    })
}