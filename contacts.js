const { json } = require('express');
const fs = require('fs');
const path = require('path')

const { promises: fsPromises } = fs;

const contactsPath  = path.join('./db/contacts.json');

// const listContacts = () => fsPromises.readFile(contactsPath, "utf-8");

function listContacts() {
  return fsPromises.readFile(contactsPath, "utf-8",(err,data) => {
    if(err){
      return console.log(err);
    }else{
        return data;
    }
  });

}

 async function getContactById(contactId) {
 return  JSON.parse(await fsPromises.readFile(contactsPath, "utf-8")).find(el => el.id === contactId);
};


 async function removeContact(contactId) {
    const data = await listContacts();    
  //delete Contact
    const dataContacts = JSON.parse(data).filter(item => item.id !== contactId );
    await fsPromises.writeFile(contactsPath, JSON.stringify(dataContacts)); 
    return dataContacts;
};



 async function addContact({name, email, phone}) {
    const data = await  listContacts();
//new id = search last id and + 1
    const newId = JSON.parse(data).map((item) => item.id).slice(-1).pop()+1;
    const contactsContent = JSON.parse(data); 
//new Obj Contact
    const newContact = { id:newId, name, email, phone };
    contactsContent.push(newContact);
    fsPromises.writeFile(contactsPath, JSON.stringify(contactsContent));
    // return newContact;
 
};

async function updateContact(updateDate){
  //Update Contacts.js
  fsPromises.writeFile(contactsPath, JSON.stringify(updateDate))
  return updateDate
}

module.exports={
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};