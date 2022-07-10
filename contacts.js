const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const oneContact = allContacts.find((e) => e.id === `${contactId}`);

  if (!oneContact) {
    return null;
  }

  return oneContact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();

  const idx = allContacts.findIndex((e) => e.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = allContacts.splice(idx, 1);
  updateContacts(allContacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
