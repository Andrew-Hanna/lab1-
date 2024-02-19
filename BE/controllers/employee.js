const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  
  // Find the index of the employee with the given ID
  const index = employee.findIndex(emp => emp.id === id);
  
  if (index !== -1) {
    // If the employee is found, remove it from the array
    employee.splice(index, 1);
    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  } else {
    // If the employee is not found, return an error response
    res.status(404).json({ success: false, message: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  // Check if both ID and name are provided
  if (!id || !name) {
    return res.status(400).json({ success: false, message: 'Please provide both ID and name' });
  }

  // Check if an employee with the same ID already exists
  const existingEmployee = employee.find(emp => emp.id === id);
  if (existingEmployee) {
    return res.status(409).json({ success: false, message: 'Employee with the same ID already exists' });
  }

  // Create a new employee object
  const newEmployee = { id, name };

  // Add the new employee to the array
  employee.push(newEmployee);

  // Return a success response with the newly created employee
  res.status(201).json({ success: true, message: 'Employee created successfully', data: newEmployee });
};
