import { ObjectId } from 'mongodb';
import connectToDatabase from './connection';

export default async function handler(req, res) {
    const DepartmentValue = {
        "Human Resources (HR)": "1",
        "Finance & Accounting": "2",
        "Marketing & Sales": "3",
        "Operations": "4",
        "IT/Engineering": "5"
    }
    const EmployementStatusValue = {
        "Full Time": "1",
        "Part Time": "2",
        "Contract": "3",
        "Internship": "4"
    }

    if (req.method === 'POST') {
        try {
            const { name, email, phoneNumber, age, gender, department, position, employmentStatus } = req.body;
            const { db } = await connectToDatabase();
            const DepartmentNewValue = DepartmentValue[department]
            const EmploymentStatusNewValue = EmployementStatusValue[employmentStatus]
            const result = await db.collection('employees').insertOne({
                name,
                email,
                phoneNumber,
                age,
                gender,
                department: DepartmentNewValue,
                position,
                employmentStatus: EmploymentStatusNewValue,
                empStatus: 'new',
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
            const { name, email, phoneNumber, age, gender, department, position, employmentStatus } = req.body;
            const { db } = await connectToDatabase();
            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }
            const result = await db.collection('employees').updateOne(
                { _id: new ObjectId(id) }, // Assuming the employee ID is passed in the URL
                {
                    $set: {
                        name,
                        email,
                        phoneNumber,
                        age,
                        gender,
                        department,
                        position,
                        employmentStatus,
                        empStatus: 'edited',
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
