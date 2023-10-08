﻿using Newtonsoft.Json;

namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class Mod
    {
        public string Id { get; private set; }
        public string InGameName { get; private set; } = "";
        public List<Item> Items { get; private set; } = new();
        public List<Block> Blocks { get; private set; } = new();
        public List<Tag> Tags { get; private set; } = new();
        public List<ProcessingType> SupportedTypes { get; private set; } = new();
        public Mod(string id) { new Mod(id, ""); }
        public Mod(string id, string inGameName)
        {
            Id = id;
            InGameName = inGameName;
            Items = new();
            Tags = new();
            Blocks = new();
            SupportedTypes = new();

        }
        [JsonConstructor]
        public Mod(string id, string inGameName, List<Item> items,List<Block> blocks, List<Tag> tags, List<ProcessingType> supportedTypes)
        {
            Id = id;
            InGameName = inGameName;
            Items = items;
            Blocks = blocks;
            Tags = tags;
            SupportedTypes = supportedTypes;


        }
    }
}
