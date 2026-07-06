-- Knowledge Base Schema for Who Knows Brain

-- Knowledge Entries Table
CREATE TABLE IF NOT EXISTS knowledge_entries (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  category VARCHAR(100),
  tags TEXT[],
  source VARCHAR(255),
  source_url TEXT,
  confidence_level VARCHAR(50), -- high, medium, low
  verified BOOLEAN DEFAULT false,
  verified_by UUID,
  verified_at TIMESTAMP,
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_accessed_at TIMESTAMP,
  access_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  search_vector tsvector,
  FOREIGN KEY (created_by) REFERENCES neon_auth."user"(id)
);

-- Knowledge Relations Table (linking related entries)
CREATE TABLE IF NOT EXISTS knowledge_relations (
  id SERIAL PRIMARY KEY,
  entry_id_1 INTEGER NOT NULL,
  entry_id_2 INTEGER NOT NULL,
  relation_type VARCHAR(50), -- related, contradicts, extends, explains
  strength FLOAT DEFAULT 0.5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (entry_id_1) REFERENCES knowledge_entries(id) ON DELETE CASCADE,
  FOREIGN KEY (entry_id_2) REFERENCES knowledge_entries(id) ON DELETE CASCADE,
  UNIQUE(entry_id_1, entry_id_2)
);

-- Agent Knowledge Links Table (linking knowledge to agents)
CREATE TABLE IF NOT EXISTS agent_knowledge_links (
  id SERIAL PRIMARY KEY,
  agent_name VARCHAR(255) NOT NULL,
  knowledge_entry_id INTEGER NOT NULL,
  relevance_score FLOAT DEFAULT 0.5,
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (knowledge_entry_id) REFERENCES knowledge_entries(id) ON DELETE CASCADE,
  UNIQUE(agent_name, knowledge_entry_id)
);

-- Knowledge Comments/Notes Table
CREATE TABLE IF NOT EXISTS knowledge_comments (
  id SERIAL PRIMARY KEY,
  entry_id INTEGER NOT NULL,
  comment TEXT NOT NULL,
  author_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (entry_id) REFERENCES knowledge_entries(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES neon_auth."user"(id)
);

-- Knowledge Versioning Table
CREATE TABLE IF NOT EXISTS knowledge_versions (
  id SERIAL PRIMARY KEY,
  entry_id INTEGER NOT NULL,
  title VARCHAR(255),
  content TEXT,
  summary TEXT,
  version_number INTEGER,
  changed_by UUID NOT NULL,
  change_summary VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (entry_id) REFERENCES knowledge_entries(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES neon_auth."user"(id)
);

-- Create Indexes
CREATE INDEX idx_knowledge_slug ON knowledge_entries(slug);
CREATE INDEX idx_knowledge_category ON knowledge_entries(category);
CREATE INDEX idx_knowledge_tags ON knowledge_entries USING GIN(tags);
CREATE INDEX idx_knowledge_created_by ON knowledge_entries(created_by);
CREATE INDEX idx_knowledge_status ON knowledge_entries(status);
CREATE INDEX idx_agent_knowledge_agent ON agent_knowledge_links(agent_name);
CREATE INDEX idx_agent_knowledge_entry ON agent_knowledge_links(knowledge_entry_id);
