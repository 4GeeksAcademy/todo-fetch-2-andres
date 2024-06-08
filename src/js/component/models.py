users = {}

def create_user(username):
    if username not in users:
        users[username] = {'name': username, 'todos': []}
    return users[username]

def delete_user(username):
    if username in users:
        del users[username]

def get_user(username):
    return users.get(username, None)

def get_all_users():
    return {'users': list(users.values())}

def create_todo(username, label):
    if username in users:
        todo_id = len(users[username]['todos']) + 1
        todo = {'id': todo_id, 'label': label, 'is_done': False}
        users[username]['todos'].append(todo)
        return todo
    return None

def update_todo(todo_id, label, is_done):
    for user in users.values():
        for todo in user['todos']:
            if todo['id'] == todo_id:
                todo['label'] = label
                todo['is_done'] = is_done
                return todo
    return None

def delete_todo(todo_id):
    for user in users.values():
        user['todos'] = [todo for todo in user['todos'] if todo['id'] != todo_id]
