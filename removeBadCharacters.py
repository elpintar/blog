# -*- coding: utf-8 -*-

# removes characters in html files that will show up badly in browsers
# (lookin like \xe2\x80\x99 instead of “)

import os

badCharacters = {
  '“': '"',
  '”': '"',
  '’': '\'',
  '‘': '\'',
  '—': '-',
  '…': '...',
}

def removeBadChars(filename):
  print 'checking', filename

  with open(filename, 'r') as file:
    filedata = file.read()

  for badChar in badCharacters:
    if (badChar in filedata):
      print '  replacing bad char:', badChar, 'with', badCharacters[badChar],
      print 'in', filename
      filedata = filedata.replace(badChar, badCharacters[badChar])

  with open(filename, 'w') as file:
    file.write(filedata)

for filename in os.listdir('.'):
  if filename.endswith('.html'):
    removeBadChars(filename)
