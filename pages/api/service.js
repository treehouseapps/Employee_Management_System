import { ObjectId } from 'mongodb';
import connectToDatabase from './connection';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { fullName, email, phone, department, position } = req.body;
            const { db } = await connectToDatabase();
            const result = await db.collection('employees').insertOne({
                fullName,
                email,
                phone,
                department,
                position,
                createdAt: new Date(),
            });
            res.status(201).json({ message: 'Employee registered successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error saving employee', error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const { db } = await connectToDatabase();
            const collection = await db.collection('employees');
            const result = await collection.find().toArray();
            res.status(200).json({
                message: 'Employee data fetched successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employee data', error: error.message });
        }
    }
    else if (req.method === 'PUT') {
        try {
            const { id } = req.query;
            const { fullName, email, phone, department, position } = req.body;
            const { db } = await connectToDatabase();
            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }
            const result = await db.collection('employees').updateOne(
                { _id: new ObjectId(id) }, // Assuming the employee ID is passed in the URL
                {
                    $set: {
                        fullName,
                        email,
                        phone,
                        department,
                        position,
                        updatedAt: new Date(), // Update timestamp
                    },
                }
            );

            if (result.modifiedCount > 0) {
                res.status(200).json({ message: 'Employee updated successfully', data: req.body });
            } else {
                res.status(400).json({ message: 'No changes made to the employee' });
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ message: 'Error updating employee', error: error.message });
        }
    }
    else if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            const { db } = await connectToDatabase();

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }
            const result = await db.collection('employees').deleteOne(
                { _id: new ObjectId(id) }
            );
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Employee deleted successfully' });
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ message: 'Error deleting employee', error: error.message });
        }
    }
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
