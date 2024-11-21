let roles = [];
let users = [];
let loggedInUser = null;

const loginSection = document.getElementById('login-section');
const roleManagementSection = document.getElementById('role-management');
const userManagementSection = document.getElementById('user-management');
const roleList = document.getElementById('role-list');
const userList = document.getElementById('user-list');
const roleSelect = document.getElementById('user-role-select');
const loginBtn = document.getElementById('login-btn');
const addRoleBtn = document.getElementById('add-role-btn');
const addUserBtn = document.getElementById('add-user-btn');
const newRoleInput = document.getElementById('new-role');
const newUserInput = document.getElementById('new-user');
const permissionsSelect = document.getElementById('permissions-select');
const statusSelect = document.getElementById('user-status-select');

// Simulated login credentials
loginBtn.addEventListener('click', () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (username === 'admin' && password === 'admin') {
        loggedInUser = { name: 'admin', roles: ['admin'] };
        alert('Login Successful!');
        toggleSections(true);
        renderRoles();
        renderUsers();
    } else {
        alert('Invalid credentials!');
    }
});

// Show/Hide sections based on login
function toggleSections(isLoggedIn) {
    loginSection.style.display = isLoggedIn ? 'none' : 'block';
    roleManagementSection.style.display = isLoggedIn ? 'block' : 'none';
    userManagementSection.style.display = isLoggedIn ? 'block' : 'none';
}

// Add new role
addRoleBtn.addEventListener('click', () => {
    const roleName = newRoleInput.value.trim();
    const selectedPermissions = Array.from(permissionsSelect.selectedOptions).map(option => option.value);

    if (roleName && selectedPermissions.length > 0) {
        const newRole = { id: Date.now(), name: roleName, permissions: selectedPermissions };
        roles.push(newRole);
        newRoleInput.value = '';
        renderRoles();
    } else {
        alert('Please fill in both role name and permissions.');
    }
});

// Render roles
function renderRoles() {
    roleList.innerHTML = '';
    roles.forEach(role => {
        const li = document.createElement('li');
        li.innerHTML = `${role.name} - Permissions: ${role.permissions.join(', ')} 
                        <button onclick="deleteRole(${role.id})">Delete</button>`;
        roleList.appendChild(li);
    });

    roleSelect.innerHTML = '';
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.textContent = role.name;
        roleSelect.appendChild(option);
    });
}

// Delete role
function deleteRole(roleId) {
    roles = roles.filter(role => role.id !== roleId);
    renderRoles();
}

// Add new user
addUserBtn.addEventListener('click', () => {
    const userName = newUserInput.value.trim();
    const selectedRoles = Array.from(roleSelect.selectedOptions).map(option => option.value);
    const userStatus = statusSelect.value;

    if (userName && selectedRoles.length > 0) {
        const newUser = { id: Date.now(), name: userName, roles: selectedRoles, status: userStatus };
        users.push(newUser);
        newUserInput.value = '';
        renderUsers();
    } else {
        alert('Please fill in both user name and roles.');
    }
});

// Render users
function renderUsers() {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `${user.name} - Roles: ${user.roles.join(', ')} - Status: ${user.status}
                        <button onclick="deleteUser(${user.id})">Delete</button>`;
        userList.appendChild(li);
    });
}

// Delete user
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    renderUsers();
}
