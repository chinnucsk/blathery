# -*- coding: utf-8 -*-

#!/usr/bin/python
import requests
import unittest

class TestMessagesAPI(unittest.TestCase):

  def setUp(self):
    self.base_url = "http://localhost:8000"
    self.api_url = "http://localhost:8000/api/messages"
    self.json_headers = {"Content-Type" : "application/json", "Accept" : "application/json"}
    self.new_message = '{"sender": "Chet Chatterton", "message": "something clever and witty"}'
    self.new_message2 = '{"sender": "Bob Blathery", "message": "something meaningless and verbose"}'
    self.new_message3 = '{"sender": "Phil Plauderi", "message": "blah blah blah"}'

  def test_get_chats(self):
    resp = requests.get(self.api_url, headers=self.json_headers)
    self.assertEqual(resp.status_code, 200)
    #self.assertEqual(resp.content, '{"name":"some guy","chat":"blah blah blah"}')

  def test_post_new_message(self):
    resp = requests.post(self.api_url, data=self.new_message, headers=self.json_headers)
    self.assertEqual(resp.status_code, 200)
    resp = requests.post(self.api_url, data=self.new_message2, headers=self.json_headers)
    self.assertEqual(resp.status_code, 200)
    resp = requests.post(self.api_url, data=self.new_message3, headers=self.json_headers)
    self.assertEqual(resp.status_code, 200)
    
    #print resp.content
    #self.assertEqual(resp.content, 'asdf')
