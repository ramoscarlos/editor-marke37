from flask import Flask, request, jsonify, render_template
from convertidores import convertidor

app = Flask(__name__,
	static_folder = './static',
)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/a_html/', methods=['POST'])
def a_html():
	texto = request.form.get('letra', 'Sin letra para mostrar.')

	# Crear convertidor y obtener objeto "letra".
	conv = convertidor.aHTML(texto)
	objLetra = conv.convertir()

	# Convertir a json para mostrar.
	datosJson = jsonify({
		'letra': objLetra.imprimir(),
		'cantidadDeLineas': objLetra.cantidad_de_lineas,
		'cantidadDePalabras': objLetra.cantidad_de_palabras,
	})

	return datosJson

# @app.route('/a_md/', methods=['POST'])
# def a_md():
# 	texto = request.form.get('letra', 'Sin letra para mostrar.')

# 	conv = convertidor.aMarkdown(texto)

# 	return jsonify({
# 		'letra': conv.convertir(),
# 	})

@app.route('/a_im/', methods=['POST'])
def a_md():
	texto = request.form.get('letra', 'Sin letra para mostrar.')

	conv = convertidor.aMensajeria(texto)

	return jsonify({
		'letra': conv.convertir(),
	})

if __name__ == '__main__':
	app.run(debug = True)