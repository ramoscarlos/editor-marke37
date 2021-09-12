#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Copyright (c) 2021 Carlos Ramos.

import urllib.parse

from marke37.letra import Letra
from marke37.letra_im_html import LetraIM_HTML


class ConvertidorBase():
    def __init__(self, texto):
        textoDecodificado = urllib.parse.unquote(texto)

        self._texto = textoDecodificado

        self._crear_objeto_letra()

    def convertir(self):
        for linea in self._texto.split("\n"):
            self.letra.agregar_linea(linea)

        return self.letra


class aHTML(ConvertidorBase):
    def _crear_objeto_letra(self):
        self.letra = Letra()

# class aMarkdown(ConvertidorBase):
#     def _crear_objeto_letra(self):
#         self.letra = LetraMarkdown()

class aMensajeria(ConvertidorBase):
    def _crear_objeto_letra(self):
        self.letra = LetraIM_HTML()