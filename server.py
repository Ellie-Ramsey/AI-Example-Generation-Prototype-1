from flask import Flask, render_template, jsonify, request
import config
import openai
import aiapi

app = Flask(__name__)
app.config.from_object(config.config['development'])

@app.route('/', methods = ['POST', 'GET'])
def home():

  if request.method == 'POST':

    prompt = request.form['prompt']
    type = request.form['type']
    previous_form = request.form['previous_form']

    res = {}

    if type == 'story':
      res['answer'] = aiapi.story_creation_prompt(prompt)

      return jsonify(res), 200
    
    elif type == 'timeline':
      res['answer'] = aiapi.timeline_creation_prompt(prompt, previous_form)

      return jsonify(res), 200


  return render_template('index.html', **locals())


if __name__ == '__main__':

  app.run(debug=True)
