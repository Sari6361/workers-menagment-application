using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Worker.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public int roleId { get; set; }
        public bool Menagment { get; set; }
        public DateTime dateStart { get; set; }
    }
}
