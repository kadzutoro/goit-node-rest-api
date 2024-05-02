import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (typeof contact === "undefined") return null;
  return contact;
}

async function addContact(contact) {
  const contacts = await readContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const contactToDelete = contacts.find((contact) => contact.id === contactId);

  if (typeof contactToDelete === "undefined") return null;
  const newContacts = contacts.filter(
    (contact) => contact.id !== contactToDelete.id
  );

  writeContacts(newContacts);
  return contactToDelete;
}

async function modifyContact( contactId, contactsData ) {
  const contacts = await readContacts();
  const contact = contact.find((contact) => contact.id === contactid);
  
  if(typeof contact === 'undefined') return null;

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  )

  const updatedContact = {
    ...contact,
    ...contactData,
  };

  updatedContacts.push(updatedContact);
  writeContacts(updatedContacts);
  return updatedContact;
}


export { listContacts, getContactById, addContact, removeContact, modifyContact };