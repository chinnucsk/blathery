# -*- coding: utf-8 -*-

#!/usr/bin/python
import requests
import unittest

class TestMessagesAPI(unittest.TestCase):

  def setUp(self):
    self.base_url = "http://localhost:8000"
    self.api_url = "http://localhost:8000/api/a"
    self.json_headers = {"Content-Type" : "application/json", "Accept" : "application/json"}

  def test_get_chats(self):
    resp = requests.get(self.api_url, headers=self.json_headers)
    self.assertEqual(resp.status_code, 200)
    self.assertEqual(resp.content, '{"name":"some guy","chat":"blah blah blah"}')