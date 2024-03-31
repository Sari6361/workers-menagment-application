using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;

namespace Worker.Core.Repositories
{
    public interface IWorkerRepository
    {
        Task<IEnumerable<Employee>> GetWorkersAsync(bool? status);
        Task<Employee>? GetWorkerByIdAsync(int id);
        Task<Employee>? AddWorkerAsync(Employee worker);
        Task<Employee>? UpdateWorkerAsync(int id, Employee worker);
        Task<Employee>? UpdateWorkerStatusAsync(int id, bool status);
    }
}
