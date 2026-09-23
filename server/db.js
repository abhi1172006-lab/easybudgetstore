import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const dbFile = path.join(dataDir, 'db.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let store = {
  users: [],
  products: [],
  product_variants: [],
  orders: [],
  order_items: [],
  bulk_quotes: [],
  coupons: [],
  audit_logs: [],
  site_settings: {}
};

function loadStore() {
  if (fs.existsSync(dbFile)) {
    try {
      const content = fs.readFileSync(dbFile, 'utf8');
      store = JSON.parse(content);
    } catch (e) {
      console.error('Error reading db.json, creating new store', e);
    }
  }
}

function saveStore() {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(store, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save db.json', e);
  }
}

export function initDatabase() {
  loadStore();
  seedDefaultData();
}

function seedDefaultData() {
  // Remove the legacy demo administrator if an older local database contains it.
  store.users = (store.users || []).filter((user) => user.email !== 'admin@easybudgetstore.com');

  // Seed Catalog if empty
  if (store.products.length === 0) {
    store.products = [
      {
        id: 'ebs-m-001',
        sku: 'TSH-OVR-001',
        name: 'Oversized Heavyweight Cotton T-Shirt',
        slug: 'oversized-heavyweight-cotton-tshirt',
        category: 'Men',
        subcategory: 'T-Shirts',
        description: 'Premium 240 GSM 100% combed cotton oversized t-shirt. Double-stitched seams, drop shoulders, reactive dye colors.',
        short_description: '240 GSM 100% Combed Cotton Oversized fit.',
        retail_mrp: 699,
        price_slab_a: 220,
        price_slab_b: 195,
        price_slab_c: 180,
        moq: 10,
        gst_percentage: 5,
        hsn_code: '6109',
        gender: 'Men',
        fabric: '240 GSM Combed Cotton',
        fit: 'Oversized',
        is_featured: 1,
        is_new_arrival: 1,
        is_bestseller: 1,
        status: 'ACTIVE',
        image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        created_at: new Date().toISOString()
      },
      {
        id: 'ebs-m-002',
        sku: 'HOD-FLE-002',
        name: 'Heavy Fleece Premium Pullover Hoodie',
        slug: 'heavy-fleece-premium-pullover-hoodie',
        category: 'Men',
        subcategory: 'Hoodies',
        description: '380 GSM super-soft fleece lined hoodie. Pre-shrunk cotton-poly blend, kangaroo pocket, ribbed cuffs.',
        short_description: '380 GSM Heavy Fleece Pullover.',
        retail_mrp: 1299,
        price_slab_a: 480,
        price_slab_b: 440,
        price_slab_c: 410,
        moq: 10,
        gst_percentage: 5,
        hsn_code: '6110',
        gender: 'Men',
        fabric: '380 GSM Fleece Cotton Blend',
        fit: 'Regular Custom',
        is_featured: 1,
        is_new_arrival: 1,
        is_bestseller: 1,
        status: 'ACTIVE',
        image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
        created_at: new Date().toISOString()
      },
      {
        id: 'ebs-m-003',
        sku: 'JAC-BOM-003',
        name: 'Quilted Thermal Bomber Jacket',
        slug: 'quilted-thermal-bomber-jacket',
        category: 'Men',
        subcategory: 'Jackets',
        description: 'Windproof heavy nylon quilted jacket with thermal insulation lining. Durable zipper, internal secret pocket.',
        short_description: 'Windproof Thermal Quilted Bomber Jacket.',
        retail_mrp: 1899,
        price_slab_a: 720,
        price_slab_b: 670,
        price_slab_c: 630,
        moq: 10,
        gst_percentage: 5,
        hsn_code: '6101',
        gender: 'Men',
        fabric: 'Nylon Shell with Polyester Quilt',
        fit: 'Regular Fit',
        is_featured: 1,
        is_new_arrival: 0,
        is_bestseller: 1,
        status: 'ACTIVE',
        image_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
        created_at: new Date().toISOString()
      },
      {
        id: 'ebs-w-001',
        sku: 'JAC-WOM-001',
        name: 'Women Cropped Puffer Winter Jacket',
        slug: 'women-cropped-puffer-winter-jacket',
        category: 'Women',
        subcategory: 'Jackets',
        description: 'Trendy cropped puffer jacket with high collar and elastic drawstring waist.',
        short_description: 'Cropped Puffer Jacket for Women.',
        retail_mrp: 1599,
        price_slab_a: 590,
        price_slab_b: 540,
        price_slab_c: 500,
        moq: 10,
        gst_percentage: 5,
        hsn_code: '6102',
        gender: 'Women',
        fabric: 'High Density Nylon + Polyfill',
        fit: 'Slim Cropped',
        is_featured: 1,
        is_new_arrival: 1,
        is_bestseller: 0,
        status: 'ACTIVE',
        image_url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
        created_at: new Date().toISOString()
      },
      {
        id: 'ebs-k-001',
        sku: 'JAC-KID-001',
        name: 'Kids Hooded Winter Puffer Jacket',
        slug: 'kids-hooded-winter-puffer-jacket',
        category: 'Kids',
        subcategory: 'Jackets',
        description: 'Vibrant color-blocked winter jacket for boys and girls.',
        short_description: 'Fleece Lined Kids Puffer Jacket.',
        retail_mrp: 999,
        price_slab_a: 380,
        price_slab_b: 340,
        price_slab_c: 310,
        moq: 10,
        gst_percentage: 5,
        hsn_code: '6101',
        gender: 'Kids',
        fabric: 'Polyester Shell with Fleece Lining',
        fit: 'Regular Kids Fit',
        is_featured: 1,
        is_new_arrival: 0,
        is_bestseller: 1,
        status: 'ACTIVE',
        image_url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
        created_at: new Date().toISOString()
      }
    ];

    // Create variants
    store.product_variants = [];
    store.products.forEach(p => {
      ['M', 'L', 'XL', 'XXL'].forEach(size => {
        ['Black', 'Navy'].forEach(color => {
          store.product_variants.push({
            id: store.product_variants.length + 1,
            product_id: p.id,
            sku: `${p.sku}-${size}-${color.toUpperCase()}`,
            size,
            color,
            stock: 150
          });
        });
      });
    });
  }

  // Site Settings
  store.site_settings = {
    site_name: 'EasyBudgetStore',
    tagline: 'WHOLESALE, FROM YOUR HOME',
    owner_name: 'Abhi Gupta',
    phone: '+91 9289981449',
    whatsapp: '919289981449',
    address: 'IX/502, Shop No. 1, Ram Lakha Mal Market, Near Tikona Park, Subhash Road, Gandhi Nagar, Delhi-110031',
    maintenance_mode: 'false'
  };

  saveStore();
}

// Database helper functions compatible with prepared statements pattern
export const db = {
  prepare(sql) {
    return {
      get(...params) {
        loadStore();
        if (sql.includes('FROM users WHERE email = ?')) {
          return store.users.find(u => u.email.toLowerCase() === params[0].toLowerCase());
        }
        if (sql.includes('FROM users WHERE id = ?')) {
          return store.users.find(u => u.id === parseInt(params[0], 10));
        }
        if (sql.includes('FROM products WHERE id = ? OR slug = ?')) {
          return store.products.find(p => p.id === params[0] || p.slug === params[1]);
        }
        if (sql.includes('FROM products WHERE id = ?')) {
          return store.products.find(p => p.id === params[0]);
        }
        if (sql.includes('COUNT(*) as count FROM products')) {
          return { count: store.products.length };
        }
        if (sql.includes('SUM(stock) as total_stock')) {
          const variants = store.product_variants.filter(v => v.product_id === params[0]);
          const total = variants.reduce((sum, v) => sum + v.stock, 0);
          return { total_stock: total || 100 };
        }
        return null;
      },

      all(...params) {
        loadStore();
        if (sql.includes('FROM products WHERE status = "ACTIVE"')) {
          let res = [...store.products.filter(p => p.status === 'ACTIVE')];
          if (sql.includes('LOWER(category) = LOWER(?)')) {
            const cat = params.shift();
            res = res.filter(p => p.category.toLowerCase() === cat.toLowerCase());
          }
          if (sql.includes('LOWER(gender) = LOWER(?)')) {
            const gen = params.shift();
            res = res.filter(p => p.gender.toLowerCase() === gen.toLowerCase());
          }
          if (sql.includes('is_featured = 1')) {
            res = res.filter(p => p.is_featured === 1);
          }
          if (sql.includes('is_new_arrival = 1')) {
            res = res.filter(p => p.is_new_arrival === 1);
          }
          if (sql.includes('is_bestseller = 1')) {
            res = res.filter(p => p.is_bestseller === 1);
          }
          if (params.length > 0 && typeof params[0] === 'string' && params[0].startsWith('%')) {
            const term = params[0].replace(/%/g, '').toLowerCase();
            res = res.filter(p =>
              p.name.toLowerCase().includes(term) ||
              p.category.toLowerCase().includes(term) ||
              p.description.toLowerCase().includes(term) ||
              p.sku.toLowerCase().includes(term)
            );
          }
          return res;
        }

        if (sql.includes('FROM product_variants WHERE product_id = ?')) {
          return store.product_variants.filter(v => v.product_id === params[0]);
        }

        if (sql.includes('FROM orders')) {
          return store.orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        if (sql.includes('FROM bulk_quotes')) {
          return store.bulk_quotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        if (sql.includes('FROM audit_logs')) {
          return store.audit_logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        return [];
      },

      run(...params) {
        loadStore();
        if (sql.includes('INSERT INTO users')) {
          const newUser = {
            id: store.users.length + 1,
            email: params[0],
            password_hash: params[1],
            full_name: params[2],
            business_name: params[3],
            phone: params[4],
            role: params[5] || 'RETAILER',
            business_type: params[6],
            gst_number: params[7],
            pan_number: params[8],
            address: params[9],
            city: params[10],
            state: params[11],
            pincode: params[12],
            status: 'ACTIVE',
            created_at: new Date().toISOString()
          };
          store.users.push(newUser);
          saveStore();
          return { lastInsertRowid: newUser.id };
        }

        if (sql.includes('INSERT INTO orders')) {
          const newOrder = {
            id: params[0],
            user_id: params[1],
            customer_name: params[2],
            business_name: params[3],
            phone: params[4],
            email: params[5],
            shipping_address: params[6],
            city: params[7],
            state: params[8],
            pincode: params[9],
            total_items: params[10],
            total_amount: params[11],
            discount_amount: params[12],
            coupon_code: params[13],
            payment_status: params[14],
            order_status: params[15],
            payment_method: params[16],
            notes: params[17],
            created_at: new Date().toISOString()
          };
          store.orders.push(newOrder);
          saveStore();
          return { lastInsertRowid: newOrder.id };
        }

        if (sql.includes('INSERT INTO order_items')) {
          store.order_items.push({
            id: store.order_items.length + 1,
            order_id: params[0],
            product_id: params[1],
            product_name: params[2],
            size: params[3],
            color: params[4],
            quantity: params[5],
            unit_price: params[6],
            subtotal: params[7]
          });
          saveStore();
          return { lastInsertRowid: store.order_items.length };
        }

        if (sql.includes('INSERT INTO bulk_quotes')) {
          const newQuote = {
            id: store.bulk_quotes.length + 1,
            customer_name: params[0],
            business_name: params[1],
            phone: params[2],
            email: params[3],
            product_id: params[4],
            product_name: params[5],
            quantity: params[6],
            required_date: params[7],
            city: params[8],
            notes: params[9],
            status: 'NEW',
            created_at: new Date().toISOString()
          };
          store.bulk_quotes.push(newQuote);
          saveStore();
          return { lastInsertRowid: newQuote.id };
        }

        if (sql.includes('INSERT INTO audit_logs')) {
          store.audit_logs.push({
            id: store.audit_logs.length + 1,
            user_email: params[0],
            action: params[1],
            entity: params[2],
            entity_id: params[3],
            details: params[4],
            created_at: new Date().toISOString()
          });
          saveStore();
          return { lastInsertRowid: store.audit_logs.length };
        }

        if (sql.includes('UPDATE orders SET order_status = ?')) {
          const order = store.orders.find(o => o.id === params[1]);
          if (order) {
            order.order_status = params[0];
            saveStore();
          }
          return { changes: 1 };
        }

        if (sql.includes('UPDATE bulk_quotes SET status = ?')) {
          const quote = store.bulk_quotes.find(q => q.id === parseInt(params[1], 10));
          if (quote) {
            quote.status = params[0];
            saveStore();
          }
          return { changes: 1 };
        }

        saveStore();
        return { changes: 1 };
      }
    };
  },
  getStore() {
    loadStore();
    return store;
  },
  saveStore
};

export default db;
