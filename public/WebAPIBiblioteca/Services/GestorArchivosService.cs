﻿namespace WebAPIBiblioteca.Services
{
    public class GestorArchivosService
    {
        private readonly IWebHostEnvironment env; // Para poder localizar wwwroot
        private readonly IHttpContextAccessor httpContextAccessor; // Para conocer la configuración del servidor para construir la url de la imagen

        public GestorArchivosService(IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccessor)
        {
            this.env = env;
            this.httpContextAccessor = httpContextAccessor;
        }

        public Task BorrarArchivo(string ruta, string carpeta)
        {
            if (ruta != null)
            {
                var nombreArchivo = Path.GetFileName(ruta);
                string rutaArchivo = Path.Combine(env.WebRootPath, carpeta, nombreArchivo);

                if (File.Exists(rutaArchivo))
                {
                    File.Delete(rutaArchivo);
                }
            }

            return Task.FromResult(0);
        }

        public async Task<string> EditarArchivo(byte[] contenido, string nombreArchivo, string carpeta, string ruta)
        {
            await BorrarArchivo(ruta, carpeta);
            return await GuardarArchivo(contenido, nombreArchivo, carpeta);
        }

        public async Task<string> GuardarArchivo(byte[] contenido, string nombreArchivo, string carpeta)
        {
            // La ruta será wwwroot/carpeta (en este caso imagenes)
            string folder = Path.Combine(env.WebRootPath, carpeta);

            // Si no existe la carpeta la creamos
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            // La ruta donde dejaremos el archivo será la concatenación de la ruta de la carpeta y el nombre del archivo
            string ruta = Path.Combine(folder, nombreArchivo);
            // Guardamos el archivo
            await File.WriteAllBytesAsync(ruta, contenido);

            // La url de la ímagen será http o https://dominio/carpeta/nombreimagen
            var urlActual = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
            var urlParaBD = Path.Combine(urlActual, carpeta, nombreArchivo).Replace("\\", "/");
            return urlParaBD;
        }
    }


}
