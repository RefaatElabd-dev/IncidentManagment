const Incident = require("../models/incident");

const create = (incident) => Incident.create(incident);

const getAll = () => Incident.find({}).exec();

const editOne = (id, body) =>
  Incident.findByIdAndUpdate(id, body, { new: true }).exec();

const getById = (id) => Incident.find({ _id: id }).exec();

const getIncidentsByUserID = (id) => Incident.find({ _id: id }).exec();

module.exports = {
  create,
  getIncidentsByUserID,
  getAll,
  editOne,
  getById,
};
