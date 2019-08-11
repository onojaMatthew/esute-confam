# ESUTE CONFAM LTD

**..Instructions on how to run the application**

### After cloning the repo, you'll observe that there are two separate folders in the root directory:
**_client_** and **_backend_** folders respectively.
The client folder contains the frontend files of the application. To **Run** the **__client_** app:

### cd client
### npm install 
### npm start

To **Run** the **_backend_** app:

At the **root** of the backend folder, create a **_.env_** file and populate it with the data below:


### JWT_SECRET=myawesomesecretvaluesthatissuperb
### DB_USER=esute
### DB_PASSWORD=esute1
### DB_NAME=esute
### NODE_ENV=development

Then **Run** the following **_commands_** at the terminal
### npm install
### npm run dev
Now bot backend and frontend applications are up and running. For the two to be able to communicate with each other we have one more thing to do.
### touch .env

Add the following line of code into the **_.env_** file you added in the client directory:

### REACT_APP_API=http://localhost:5000/api

**Stop** the two servers busing **_ctl+c_** on your key and **restart** them again with the following commands:

### **npm start** inside the client directory and;
### **npm run dev** in the backend directory
You can view the running app at **http://localhost:3000** on your browser