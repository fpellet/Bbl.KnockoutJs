using System.IO;
using System.Linq;
using System.Web.Hosting;
using Nancy;
using Owin;

namespace Bbl.KnockoutJs
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseNancy();
        }
    }

    public class IndexModule : NancyModule
    {
        private const string UnicornsPath = "/Content/Unicorn/";

        public IndexModule()
        {
            Get["/"] = parameters => View["index"];

            Get["/api/unicorns"] = parameters =>
                {
                    var imagesDirectory = HostingEnvironment.MapPath("~" + UnicornsPath);
                    return new DirectoryInfo(imagesDirectory)
                        .EnumerateFiles()
                        .Select(ConvertToDto);
                };
        }

        private dynamic ConvertToDto(FileInfo file)
        {
            var name = Path.GetFileNameWithoutExtension(file.Name);

            return new
                   {
                       Key = name,
                       ImagePath = UnicornsPath + file.Name,
                       Name = name.Replace('_', ' '),
                       Keywords = name.Split('_'),
                       CreationDate = file.CreationTime
                   };
        }
    }
}