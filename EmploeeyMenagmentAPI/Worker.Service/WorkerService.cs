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
        public async Task<IEnumerable<Employee>> GetWorkersAsync(bool? status, int menagerId)
        {
            return await _workerRepository.GetWorkersAsync(status, menagerId);
        }
        public Task<Employee>? GetWorkerByIdAsync(int id)
        {
           return _workerRepository.GetWorkerByIdAsync(id);
        }
        public async Task<Employee> AddWorkerAsync(Employee worker)
        {
            return await _workerRepository.AddWorkerAsync(worker);
        }

        public Task<Employee>? UpdateWorkerAsync(int id, Employee worker)
        {
            return _workerRepository.UpdateWorkerAsync(id, worker);
        }

        public Task<Employee>? UpdateWorkerStatusAsync(int id, bool status)
        {
           return _workerRepository.UpdateWorkerStatusAsync(id, status);
        }
    }
}
