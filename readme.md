---
noteId: "365ee650d27f11ea8c1aaf3b0c729447"
tags: []

---

# 
# Upload file |  Upload file to DB
 1. File upload setup
    * install multer package
        def: multer - this is middleware which handle that form filed which have enctype multipart/form-data.
    * create file.js in middleware folder, or setup middleware
        * store config (folder and file)
            * destinatioin - A string or function that determines the destination 📁 path for uploaded files. | folder in which will store upload files.
            * filename - A function that determines the name of the uploaded file.📰
        * file filter (accept files)
    * 
    * switch file middleware
        * after session and before csrf we switch file middleware
        * not forget to add enctype of forms
        * for unque name we  install momentjs (standart: file name wiil be current date...)

        Potential errors
            * CONSOLE - Failed to load resource: the server responded with a status of 500 (Internal Server Error)
            IN PAGE - Error: ENOENT: no such file or directory, open 'D:\uploads\avatar-2020-08-13 21:34:29_901-me1.JPG' 
                error occurd becouse - not express.static
 2. File upload
    *
    *
    *
    *