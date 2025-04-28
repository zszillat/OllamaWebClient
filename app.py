from fastapi import FastAPI, Request, Form, Query, Body
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/save_settings")
async def save_settings(new_settings: dict = Body(...)):
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
    return templates.TemplateResponse("settings.html", {"request": request})
