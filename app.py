from fastapi import FastAPI, HTTPException, Request, Form, Query, Body
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import json
from SessionManager import SessionManager

sm = SessionManager()

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

SETTINGS_PATH = "settings.json"

@app.post("/save_settings")
async def save_settings(new_settings: dict = Body(...)):
    """
    Receive the settings dict in the request body,
    write it out to settings.json, and return success.
    """
    try:
        with open(SETTINGS_PATH, "w", encoding="utf-8") as f:
            json.dump(new_settings, f, ensure_ascii=False, indent=2)
    except Exception as e:
        # something went wrong writing the file
        raise HTTPException(status_code=500, detail=f"Failed to save settings: {e}")

    return {"status": "success"}

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})

@app.post("/delete_chat")
async def delete_chat(filename: str = Form(...)):
    return RedirectResponse(url="/", status_code=303)

@app.post("/chat", response_class=HTMLResponse)
async def chat(request: Request, user_input: str = Form(...)):
    return templates.TemplateResponse("chat.html", {"request": request})

@app.post("/new_chat")
async def new_chat():
    return RedirectResponse(url="/", status_code=303)

@app.get("/load_chat")
async def load_chat(filename: str = Query(...)):
    return RedirectResponse(url="/", status_code=303)

@app.get("/settings", response_class=HTMLResponse)
async def settings(request: Request):

    # Get Files
    with open("settings.json") as f:
        settings_data = json.load(f)
    with open("presets.json") as f:
        presets_data = json.load(f)

    return templates.TemplateResponse(
        "settings.html",
        {
            "request": request,
            "settings": SessionManager.get_settings(),
            "presets": SessionManager.get_presets()
        }
    )
