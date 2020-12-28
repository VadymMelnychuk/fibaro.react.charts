namespace fibaro.energy.charts
{
    using System;
    using System.Net.Http;
    using System.Threading.Tasks;
    using fibaro.energy.charts.Configs;
    using fibaro.energy.charts.Models;
    using Microsoft.Extensions.Options;

    public class FibaroHttpClient
    {
        private readonly HttpClient httpClient;
        private readonly HubSection options;

        public FibaroHttpClient(HttpClient httpClient, IOptionsMonitor<HubSection> options)
        {
            this.httpClient = httpClient;
            this.options = options.CurrentValue;
            httpClient.BaseAddress = this.options.Address;
        }

        public async Task<HttpResponseMessage> Query(ProxyRequestModel model)
        {
            var req = new HttpRequestMessage(new HttpMethod(model.Method), model.Url);

            req.Headers.Add("Authorization", this.options.Authorization);

            var resp = await this.httpClient.SendAsync(req);
            return resp;
        }
    }
}