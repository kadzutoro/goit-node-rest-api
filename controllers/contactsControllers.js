import Contact from "../models/contact.js";
import HttpError from "../helpers/httpError.js";


export const getAllContacts = async (req, res, next) => {
  try {
    const { favorite } = req.query;
    const owner = req.user.id;

    let query = { owner };
    if (typeof favorite !== "undefined") {
      query.favorite = favorite;
    }

    const contacts = await Contact.find(query);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = req.user.id;
    const contact = await Contact.findOne({_id: id, owner});
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = req.user.id;
    const contact = await Contact.findOne({_id:id, owner});
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
    try {
      const owner = req.user.id;
      const contactData = {
        ...req.body,
        owner,
      }
      const contact = await Contact.create(contactData);
      res.status(201).json(contact)
    } catch (error) {
      next(error)
    }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = req.user.id;
    const contact = await Contact.findOneAndUpdate( {_id:id, owner}, req.body, {new: true,} );

    if (!contact) {
      throw HttpError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const { id } = req.params;
    const contact = await Contact.findOneAndUpdate( {_id:id, owner}, req.body, {new: true,} );
    if(!contact) {
      throw HttpError(404);
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
}
