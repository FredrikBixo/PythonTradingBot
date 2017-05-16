#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
ZetCode PyQt5 tutorial

This example shows a tooltip on
a window and a button.

author: Jan Bodnar
website: zetcode.com
last edited: January 2015
"""


import sys
from algostart import rater
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):



        QToolTip.setFont(QFont('SansSerif', 10))

        self.setToolTip('This is a <b>QWidget</b> widget')

        label = QLabel("Downloading data", self)
        # hello.setWindowFlags(Qt.Window) # Make this widget a standalone window even though it is parented
        label.setGeometry(100, 5, 280, 20)
        label.show()

        progressBar = QProgressBar(self)

        progressBar.setToolTip('This is a <b>QPushButton</b> widget')
        # progressBar.setStyleSheet("background-color: green")
        progressBar.setMinimum(0)
        progressBar.setMaximum(500)
        progressBar.setGeometry(10, 20, 280, 40)
        pp = progressBar.palette()
        pp.setColor(progressBar.backgroundRole(), Qt.green)
        progressBar.setPalette(pp);
        progressBar.setValue(0)
        # progressBar.move(110, 80)
        # progressBar.clicked.connect(self.handleButton)

        btn = QPushButton('Download', self)
        btn.setToolTip('This is a <b>QPushButton</b> widget')
        btn.resize(btn.sizeHint())
        btn.setStyleSheet("background-color: green")
        btn.move(110, 80)
        btn.clicked.connect(self.handleButton)

        self.setGeometry(300, 300, 300, 200)
        self.setMaximumSize(300, 200)
        self.setMinimumSize(300, 200)
        self.setWindowTitle('Tooltips')
        p = self.palette()
        p.setColor(self.backgroundRole(), Qt.gray)
        self.setPalette(p)
        self.show()

    def handleButton(self):
        print ('Started downloading ticker data')

        items = self.children()
        rater(items[1])

    def updateValue(self):
        items = self.children()
        print("h")
        items[1].setValue(500)


if __name__ == '__main__':

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())
