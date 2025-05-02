from OllamaPythonClient import Ollama, Options
import json

class SessionManager:
    def __init__(self):
        self.client = None

    @staticmethod
    def load_json(json_file):
        with open(json_file) as f:
            loaded_json = json.load(f)
        return loaded_json
        

    def new_chat(self):
        self.client = Ollama('http://10.0.0.1:11434', )

    def get_settings():
        return SessionManager.load_json('settings.json')
    
    def get_presets():
        return SessionManager.load_json('presets.json')
    
        
    
    # def get_default_preset():
    #     return 