from flask import Flask, request, jsonify
from models import create_user, delete_user, get_user, get_all_users, create_todo, update_todo, delete_todo

app = Flask(__name__)

@app.route('/users/<username>', methods=['POST'])
def create_user_route(username):
    user = create_user(username)
    return jsonify(user), 201
    

@app.route('/users/<username>', methods=['DELETE'])
def delete_user_route(username):
    delete_user(username)
    return '', 204

@app.route('/users/<username>', methods=['GET'])
def get_user_route(username):
    user = get_user(username)
    return jsonify(user), 200

@app.route('/users', methods=['GET'])
def get_all_users_route():
    users = get_all_users()
    return jsonify(users), 200

@app.route('/todos/<username>', methods=['POST'])
def create_todo_route(username):
    data = request.json
    todo = create_todo(username, data['label'])
    return jsonify(todo), 201

@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo_route(todo_id):
    data = request.json
    updated_todo = update_todo(todo_id, data['label'], data['is_done'])
    return jsonify(updated_todo), 200

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo_route(todo_id):
    delete_todo(todo_id)
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
