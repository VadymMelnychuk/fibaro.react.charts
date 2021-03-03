namespace fibaro.energy.charts.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System.Threading.Tasks;
    using fibaro.energy.charts.Models;

    [ApiController]
    [Route("[controller]")]
    public class FibaroController : ControllerBase
    {
        private readonly ILogger<FibaroController> _logger;
        private readonly FibaroHttpClient httpClient;

        public FibaroController(ILogger<FibaroController> logger, FibaroHttpClient httpClient)
        {
            _logger = logger;
            this.httpClient = httpClient;
        }

        [HttpPost]
        public async Task<string> Post([FromBody] ProxyRequestModel model)
        {
            _logger.LogInformation($"Request url: {model.Url}; Method: {model.Method}");

            var resp = await httpClient.Query(model);
            resp.EnsureSuccessStatusCode();

            var respBody = await resp.Content.ReadAsStringAsync();
            return respBody;
        }

        [HttpGet("image")]
        public async Task<IActionResult> GetImage([FromQuery] string path)
        {
            _logger.LogInformation($"GetImage. Request url: {path}");

            var model = new ProxyRequestModel
            {
                Method = "GET",
                Url = path
            };

            var resp = await httpClient.Query(model);
            resp.EnsureSuccessStatusCode();

            var respBody = await resp.Content.ReadAsStreamAsync();
            return Ok(respBody);
        }
    }
}
