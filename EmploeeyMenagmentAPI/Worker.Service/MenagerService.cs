﻿using Worker.Core.Entities;
using Worker.Core.Repositories;
using Worker.Core.Services;

namespace Worker.Service
{
    public class MenagerService : IMenagerService
    {
        private readonly IMenagerRepository _repository;
        public MenagerService(IMenagerRepository repository)
        {
            _repository = repository;
        }
        public List<Menager> GetMenagers() => _repository.GetMenagers();
      

        public async Task<Menager> GetMenagerByIdAsync(int id)
        {
            return await _repository.GetMenagerByIdAsync(id);
        }

        public async Task<Menager> GetMenagerByNameAndPassword(string name, string password)
        {
            return await _repository.GetMenagerByNameAndPasswordAsync(name, password);
        }

        public async Task<Menager> AddMenagerAsync(Menager menager)
        {
            return await _repository.AddMenagerAsync(menager);
        }

        public async Task<Menager> UpdateMenagerAsync(int id, Menager menager)
        {
            return await _repository.UpdateMenagerAsync(id, menager);
        }
    }
}
