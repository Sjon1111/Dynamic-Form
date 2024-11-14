import express from "express";
import mongoose from "mongoose";
import mongodb from 'mongodb';
import { MongoClient } from "mongodb";
import Form from "../Model/form.js";


const dburl = "mongodb://127.0.0.1:27017"

const client = new MongoClient(dburl);
client.connect();
const database = client.db("Form")
const collection = database.collection("forms");

export const insertData = async (req, res) => {
  const dataForm = req.body;

  try {
    const insertData = new Form({
      fields: dataForm
    });

    await insertData.save();

    console.log(insertData);
    res.status(201).send(insertData);
  } catch (error) {

    res.status(500).send({ error: 'Failed  insert data' });
  }
};


export const getData = async (req, res) => {
  try {
    const allData = await Form.find();
    res.status(200).json(allData);
    console.log(allData);
  } catch (error) {

    res.status(500).send({ error: 'Failed to get data' });
  }
};


export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body.fields;


    const result = await Form.findByIdAndUpdate(
      id,
      { fields: updatedFields },
      { new: true }
    );

    if (result) {
      res.status(200).json({ message: "Form updated Done", form: result });
    } else {
      res.status(404).json({ message: "form not found" });
    }
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: "Error updating form" });
  }
}

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;


    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not available' });
    }


    res.status(200).json({ message: 'Form deleted done', deletedForm });
  } catch (error) {

    res.status(500).json({ message: 'error in form deleting' });
  }
};

