using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;

namespace Worker.Core.Services
{
    public interface IWorkerService
    {
        Task<IEnumerable<Entities.Employee>>? GetWorkersAsync(bool? status, int menagerId);
        Task<Entities.Employee>? GetWorkerByIdAsync(int id);
        Task<Entities.Employee>? AddWorkerAsync(Entities.Employee worker);
        Task<Entities.Employee>? UpdateWorkerAsync(int id, Entities.Employee worker);
        Task<Entities.Employee>? UpdateWorkerStatusAsync(int id, bool status);
    }
}
