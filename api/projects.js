export default function handler(req, res) {
    // Check request method (GET, POST, PUT, DELETE)
    if (req.method === 'GET') {
        // In a real application, you would fetch data from a database or an external API
        const projects = [
            { id: 1, name: 'Project 1' },
            { id: 2, name: 'Project 2' },
        ];
        res.status(200).json(projects); // Send the projects as a JSON response
    } else if (req.method === 'POST') {
        // In a real application, you would save the new project to a database
        const newProject = req.body; // Get the project data from the request body.
        console.log('Recieived new project:', newProject);
        res.status(201).json({ message: 'Project created successfully', project: newProject }); // Send a success response
        } else {
        res.status(405).json({ message: 'Method not allowed' });

    }
}