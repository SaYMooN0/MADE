﻿using Newtonsoft.Json;

namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class Mod
    {
        public string Id { get; private set; }
        public List<string> Items { get; private set; } = new List<string>();
        public List<string> Tags { get; private set; } = new List<string>();
        public Mod(string id)
        {
            Id = id;
            Items = new();
            Tags = new();
        }
        [JsonConstructor]
        public Mod(string id, List<string> items, List<string> tags)
        {
            Id = id;
            Items = items;
            Tags = tags;
        }
    }
}
