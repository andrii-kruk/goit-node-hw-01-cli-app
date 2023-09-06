import { Command } from "commander";

import {
  listContacts,
  addContact,
  removeContact,
  getContactById,
  updateContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);

      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);

      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(deletedContact);
      break;
    case "update":
      const updatedContact = await updateContact(id, { name, email, phone });
      console.log(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
