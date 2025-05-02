import requests
import json

class a:
    def __init__(self):
        self.base_url = "http://10.0.0.1:11434"

    def get_installed_models(self):
        r = requests.post(f"{self.base_url}/api/chat")
        r.raise_for_status()
        rJSON = json.load(r)
        return [model['name'] for model in rJSON['models']]    
            
print()