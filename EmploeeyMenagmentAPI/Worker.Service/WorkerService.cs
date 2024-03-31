using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;
using Worker.Core.Repositories;
using Worker.Core.Services;

namespace Worker.Service
{

    public class WorkerService : IWorkerService
    {
        private readonly IWorkerRepository _workerRepository;
        public WorkerService(IWorkerRepository repository)
        {
            _workerRepository = repository;
        }
        public async Task<IEnumerable<Core.Entities.Employee>> GetWorkersAsync(bool? status)
        {
            return await _workerRepository.GetWorkersAsync(status);
        }
        public Task<Core.Entities.Employee>? GetWorkerByIdAsync(int id)
        {
           return _workerRepository.GetWorkerByIdAsync(id);
        }
        public async Task<Core.Entities.Employee> AddWorkerAsync(Core.Entities.Employee worker)
        {
            return await _workerRepository.AddWorkerAsync(worker);
        }

        public Task<Core.Entities.Employee>? UpdateWorkerAsync(int id, Core.Entities.Employee worker)
        {
            return _workerRepository.UpdateWorkerAsync(id, worker);
        }

        public Task<Core.Entities.Employee>? UpdateWorkerStatusAsync(int id, bool status)
        {
           return _workerRepository.UpdateWorkerStatusAsync(id, status);
        }
    }
}
