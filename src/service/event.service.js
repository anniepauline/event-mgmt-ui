import axios from "axios";

const API_URL = "http://localhost:8081"; 

class UserService {
UserService(){   
}

    // 
    saveUser(user) {
        //the object goes to the controller in sts and the obj is saved in the db
        return axios.post(API_URL + "/api/user/add", user);
    }

    getAllUser() {
        return axios.get(API_URL + "/api/user/all");
    }

    getUserById(id) {
        return axios.get(API_URL + "/find/" + id);
    }

    deleteUser(id) {
        return axios.get(API_URL + "/delete/" + id);
    }
    
    // editUser(user) {
    //     return axios.post(API_URL + "/editProduct/" + user.id, user);
    // }

    checkEmail(email)
    {
        return axios.get(API_URL + "/api/user/checkEmail?email="+email);
    }
}

export default new UserService;
