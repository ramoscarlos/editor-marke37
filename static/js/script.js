/*******************************************************************
 * "Constantes"                                                    *
 *******************************************************************/
CONV_HTML = 'a_html';
CONV_MD = 'a_md';
CONV_IM = 'a_im';



/*******************************************************************
 * Clases                                                          *
 *******************************************************************/

class Letra {
    enviarPeticion(texto) {
        var self = this;
        var peticion = $.ajax({
            'url': convertidor,
            'data': {'letra': texto},
            'type': 'POST',
            'error': function (xhr) {
                console.log("Error.");
            },
            'success': function (response) {
                self.imprimir(response);
            }
        })
    }

    imprimir(respuesta) {
        actualizarHTML(respuesta);
    }
}



/*******************************************************************
 * Globales                                                        *
 *******************************************************************/

var letra = new Letra();
var convertidor = CONV_HTML;



/*******************************************************************
 * Atajos de teclado                                               *
 *******************************************************************/

// Líneas agregadas para poder usar hotkeys al estar escribiendo.
hotkeys.filter = function(event) {
  return true;
}

// Enfoque en textarea.
hotkeys('ctrl+shift+f', function(event, handler) {
    event.preventDefault();
    $('#txtLetra').focus();
});

// Cambia el convertidor de la letra.
hotkeys('ctrl+shift+c', function(event, handler) {
    event.preventDefault();

    actualizarInterfaz();
});




/*******************************************************************
 * Control de la interfaz                                          *
 *******************************************************************/

function conmutarConvertidor() {
    if (convertidor == CONV_HTML) {
        convertidor = CONV_IM;
    } else {
        convertidor = CONV_HTML;
    }
}

function actualizarInterfaz() {
    conmutarConvertidor();

    $( "#spnConvertidor" ).text( convertidor.slice(2).padEnd(4, '\xa0') );

    actualizarLetra();
}

function actualizarHTML(objLetra) {
    $( "#divLetra" ).html( objLetra.letra );
    // Actualizar estadísticas.
    $( "#spnLineas" ).html( objLetra.cantidadDeLineas );
    $( "#spnPalabras" ).html( objLetra.cantidadDePalabras );

}

function actualizarLetra() {
    // Obtener la letra del textarea.
    var texto = $("#txtLetra").val();
    // Actualizar la letra.
    letra.enviarPeticion(texto);
}

$(function() {
    actualizarLetra();

    // Con esta declaración ya podemos copiar el texto con nuestro shortcut.
    new ClipboardJS('#btnCopiar');

    $( "#txtLetra" ).on('change keyup paste', actualizarLetra);
    $( "#divConvertidor" ).on('click', actualizarInterfaz);
});