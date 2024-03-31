using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Entities;

namespace Worker.Core.Repositories
{
    public interface IMenagerRepository
    {
        List<Menager> GetMenagers();
        Task<Menager>? GetMenagerByIdAsync(int id);
        Task<Menager>? GetMenagerByNameAndPasswordAsync(string name, string password);
        Task<Menager>? AddMenagerAsync(Menager m);
        Task<Menager>? UpdateMenagerAsync(int id, Menager m);
    }
}
