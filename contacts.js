const fs = require('fs');
const path = require('path')

const contactsPath  = path.join('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath,'utf8',(err,data) => {
    if(err){
      console.log(err);
    }else{
      console.log(JSON.parse(data));
    }
  });

}

function getContactById(contactId) {
   fs.readFile(contactsPath, 'utf8', (err,data) =>{
        if(err){
          console.log(err);
        }else{
  //search Contact
         const dataContacts = JSON.parse(data).find(item => item.id === contactId);
         console.log(dataContacts);
        }
    });
};


function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err,data) =>{    
    if(err){
      console.log(err);
    }else{
  //delete Contact
     const dataContacts = JSON.parse(data).filter(item => item.id !== contactId );
     fs.writeFileSync(contactsPath, JSON.stringify(dataContacts));
     listContacts();
    }
  });

}


function addContact(name, email, phone) {
 fs.readFile(contactsPath, 'utf8', (err,data) =>{
     if(err) throw err;
//new id = search last id and + 1
     const newId = JSON.parse(data).map((item) => item.id).slice(-1).pop()+1;
 
     const contactsContent = JSON.parse(data); 
     
//new Obj Contact
     const newContact = { id:newId, name, email, phone };
    
     contactsContent.push(newContact);
     fs.writeFileSync(contactsPath,  JSON.stringify(contactsContent), err => {
       if(err) throw err;
    });

    listContacts();
});


}

module.exports={
  listContacts,
  getContactById,
  removeContact,
  addContact
};