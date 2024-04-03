using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;

namespace Worker.Core.Services
{
    public interface IMenagerService
    {
        List<Menager> GetMenagers();
        Task<Menager>? GetMenagerByIdAsync(int id);
        Task<Menager>? GetMenagerByNameAndPassword(string name, string password);
        Task<Menager>? AddMenagerAsync(Menager menager);
        Task<Menager>? UpdateMenagerAsync(int id, Menager menager);

       // Task<Menager>? AddWorkerToMenagerAsync(int menagerId, Employee e);
       // Task<Menager>? UpdateWorkerAsync(int menagerId, int id,Employee e);
       // Task<Menager>? UpdateWorkerStatusAsync(int menagerId, int id, bool status);
    }
}
