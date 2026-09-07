import { useMemo, useState } from "react";
import {
  FileText,
  Receipt,
  QrCode,
  Menu,
  X,
  ArrowRight,
  Check,
  Maximize2,
  Minimize2,
  FileImage,
  RotateCw,
  FlipHorizontal,
  Palette,
  Sun,
  Contrast,
  ScanLine,
  Download,
  Sparkles,
} from "lucide-react";

const tools = [
  [
    "resume",
    FileText,
    "Resume Builder",
    "Build an ATS-friendly resume with live templates.",
    "Students",
  ],
  [
    "invoice",
    Receipt,
    "Invoice Generator",
    "Create client-ready invoices with pricing controls.",
    "Business",
  ],
  [
    "qr",
    QrCode,
    "QR Generator",
    "Turn any link or text into a downloadable QR code.",
    "Free",
  ],
] as const;

const imageTools = [
  [
    "image-resize",
    Maximize2,
    "Resize Image",
    "Change width and height with an optional locked ratio.",
    "Size",
  ],
  [
    "image-compress",
    Minimize2,
    "Compress Image",
    "Reduce file size by tuning export quality.",
    "Speed",
  ],
  [
    "image-convert",
    FileImage,
    "Format Converter",
    "Convert images between JPG, PNG and WEBP.",
    "Convert",
  ],
  [
    "image-4k",
    ScanLine,
    "Enhance to 4K",
    "Upscale an image up to 3840px wide.",
    "4K",
  ],
  [
    "image-rotate",
    RotateCw,
    "Rotate Image",
    "Rotate images in 90° steps and export.",
    "Edit",
  ],
  [
    "image-flip",
    FlipHorizontal,
    "Flip Image",
    "Mirror an image horizontally.",
    "Edit",
  ],
  [
    "image-brightness",
    Sun,
    "Brightness",
    "Lighten or darken an image.",
    "Adjust",
  ],
  [
    "image-contrast",
    Contrast,
    "Contrast",
    "Boost or soften image contrast.",
    "Adjust",
  ],
  [
    "image-grayscale",
    Palette,
    "Black & White",
    "Turn a color image into grayscale.",
    "Filter",
  ],
  [
    "image-export",
    Download,
    "Image Exporter",
    "Export an edited image with chosen settings.",
    "Export",
  ],
] as const;

export default function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const [client, setClient] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(100);

  const [qr, setQr] = useState("");

  const [url, setUrl] = useState("");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [quality, setQuality] = useState(85);
  const [format, setFormat] = useState("jpeg");
  const [rotate, setRotate] = useState(0);
  const [flip, setFlip] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [gray, setGray] = useState(false);

  const filtered = useMemo(
    () =>
      tools.filter((tool) =>
        `${tool[2]} ${tool[3]}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  const open = (id: string) => {
    setActive(id);
    setMenu(false);
  };

  const upload = (file: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    setUrl(URL.createObjectURL(file));
  };

  const exportImage = () => {
    if (!url) return;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        grayscale(${gray ? 100 : 0}%)
      `;

      ctx.translate(width / 2, height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.scale(flip ? -1 : 1, 1);

      ctx.drawImage(
        img,
        -width / 2,
        -height / 2,
        width,
        height
      );

      const mime =
        format === "png"
          ? "image/png"
          : format === "webp"
          ? "image/webp"
          : "image/jpeg";

      const link = document.createElement("a");
      link.href = canvas.toDataURL(mime, quality / 100);
      link.download = `pulsetool-image.${format}`;
      link.click();
    };

    img.src = url;
  };

  return (
    <div>
      <header className="nav">
        <div className="brand">
          <span className="logo">P</span>
          <span>PulseTool</span>
        </div>

        <nav>
          <a href="#tools">Tools</a>
          <a href="#image-tools">Image Tools</a>
          <a href="#about">About</a>
        </nav>

        <button
          className="menu"
          onClick={() => setMenu(!menu)}
          aria-label="Open menu"
        >
          {menu ? <X /> : <Menu />}
        </button>

        {menu && (
          <div className="mobileMenu">
            <a href="#home" onClick={() => setMenu(false)}>
              Home
            </a>

            <a href="#tools" onClick={() => setMenu(false)}>
              All Tools
            </a>

            <button onClick={() => open("resume")}>
              Resume Builder
            </button>

            <button onClick={() => open("invoice")}>
              Invoice Generator
            </button>

            <button onClick={() => open("qr")}>
              QR Generator
            </button>

            <a
              href="#image-tools"
              onClick={() => setMenu(false)}
            >
              Image Tools
            </a>

            <a href="#about" onClick={() => setMenu(false)}>
              About PulseTool
            </a>
          </div>
        )}
      </header>

      <main id="home">
        <section className="hero">
          <div className="eyebrow">
            <Sparkles size={15} />
            Smart tools for everyday work
          </div>

          <h1>
            Make useful things.
            <br />
            <span>Beautifully.</span>
          </h1>

          <p>
            Fast browser tools for students, creators and small
            businesses.
          </p>

          <div className="search">
            ⌕
            <input
              aria-label="Search tools"
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="trust">
            <span>
              <Check /> Free to use
            </span>

            <span>
              <Check /> No signup
            </span>

            <span>
              <Check /> Browser-based
            </span>
          </div>
        </section>

        <section id="tools" className="section">
          <div className="sectionHead">
            <div>
              <small>TOOLBOX</small>
              <h2>Pick a tool. Finish the job.</h2>
            </div>

            <span>{filtered.length} tools</span>
          </div>

          <div className="grid">
            {filtered.map(
              ([id, Icon, title, text, tag]) => (
                <button
                  className="card"
                  key={id}
                  onClick={() => open(id)}
                >
                  <div className="cardTop">
                    <div className="icon">
                      <Icon />
                    </div>

                    <span className="tag">{tag}</span>
                  </div>

                  <h3>{title}</h3>
                  <p>{text}</p>

                  <div className="go">
                    Open tool <ArrowRight />
                  </div>
                </button>
              )
            )}
          </div>
        </section>

        <section id="image-tools" className="section">
          <div className="sectionHead">
            <div>
              <small>IMAGE TOOLS</small>
              <h2>Everything you need for images.</h2>
            </div>

            <span>{imageTools.length} tools</span>
          </div>

          <p className="sectionLead">
            Resize, compress, convert, upscale, rotate and
            fine-tune images directly in your browser.
          </p>

          <div className="grid">
            {imageTools.map(
              ([id, Icon, title, text, tag]) => (
                <button
                  className="card"
                  key={id}
                  onClick={() => open(id)}
                >
                  <div className="cardTop">
                    <div className="icon">
                      <Icon />
                    </div>

                    <span className="tag">{tag}</span>
                  </div>

                  <h3>{title}</h3>
                  <p>{text}</p>

                  <div className="go">
                    Open tool <ArrowRight />
                  </div>
                </button>
              )
            )}
          </div>
        </section>

        <section id="about" className="why">
          <div>
            <small>WHY PULSETOOL</small>

            <h2>
              Simple on the surface.
              <br />
              Powerful underneath.
            </h2>
          </div>

          <p>
            Designed around real tasks: build a resume, send an
            invoice, make a QR, or transform an image without
            clutter. PulseTool keeps the core toolkit free and
            browser-based.
          </p>
        </section>
      </main>

      <footer>
        <div className="brand">
          <span className="logo">P</span>
          <span>PulseTool</span>
        </div>

        <span>
          © 2026 PulseTool. All rights reserved.
        </span>
      </footer>

      {active && (
        <div className="modalBack">
          <div className="modal">
            <button
              className="close"
              onClick={() => setActive(null)}
            >
              <X />
            </button>

            {active === "resume" ? (
              <>
                <h2>Resume Builder</h2>

                <input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                <input
                  placeholder="Job title"
                  value={job}
                  onChange={(e) =>
                    setJob(e.target.value)
                  }
                />

                <div className="preview">
                  <h2>{name || "Your Name"}</h2>

                  <p>
                    {job || "Your professional title"}
                  </p>

                  <hr />

                  <b>Experience</b>

                  <p>
                    Add your experience and achievements.
                  </p>
                </div>
              </>
            ) : active === "invoice" ? (
              <>
                <h2>Invoice Generator</h2>

                <input
                  placeholder="Client name"
                  value={client}
                  onChange={(e) =>
                    setClient(e.target.value)
                  }
                />

                <input
                  placeholder="Item"
                  value={item}
                  onChange={(e) =>
                    setItem(e.target.value)
                  }
                />

                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) =>
                    setQty(Number(e.target.value))
                  }
                />

                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) =>
                    setPrice(Number(e.target.value))
                  }
                />

                <div className="preview">
                  <b>{client || "Client"}</b>

                  <p>
                    {item || "Item"} × {qty}
                  </p>

                  <h3>
                    Total: ₹{qty * price}
                  </h3>
                </div>
              </>
            ) : active === "qr" ? (
              <>
                <h2>QR Generator</h2>

                <input
                  placeholder="Enter text or link"
                  value={qr}
                  onChange={(e) =>
                    setQr(e.target.value)
                  }
                />

                {qr && (
                  <div className="qrBox">
                    <div>QR</div>
                    <small>{qr}</small>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2>
                  {imageTools.find(
                    (tool) => tool[0] === active
                  )?.[2] || "Image Tool"}
                </h2>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    upload(
                      e.target.files?.[0] || null
                    )
                  }
                />

                {url && (
                  <img
                    className="imagePreview"
                    src={url}
                    alt="Preview"
                  />
                )}

                <div className="controls">
                  <label>
                    Width
                    <input
                      type="number"
                      value={width}
                      onChange={(e) =>
                        setWidth(
                          Number(e.target.value)
                        )
                      }
                    />
                  </label>

                  <label>
                    Height
                    <input
                      type="number"
                      value={height}
                      onChange={(e) =>
                        setHeight(
                          Number(e.target.value)
                        )
                      }
                    />
                  </label>

                  <label>
                    Quality
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) =>
                        setQuality(
                          Number(e.target.value)
                        )
                      }
                    />
                  </label>

                  <label>
                    Format
                    <select
                      value={format}
                      onChange={(e) =>
                        setFormat(e.target.value)
                      }
                    >
                      <option value="jpeg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WEBP</option>
                    </select>
                  </label>

                  <button
                    onClick={() =>
                      setRotate((rotate + 90) % 360)
                    }
                  >
                    Rotate
                  </button>

                  <button
                    onClick={() => setFlip(!flip)}
                  >
                    Flip
                  </button>

                  <button
                    onClick={() => setGray(!gray)}
                  >
                    B&W
                  </button>

                  <label>
                    Brightness
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={brightness}
                      onChange={(e) =>
                        setBrightness(
                          Number(e.target.value)
                        )
                      }
                    />
                  </label>

                  <label>
                    Contrast
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={contrast}
                      onChange={(e) =>
                        setContrast(
                          Number(e.target.value)
                        )
                      }
                    />
                  </label>

                  <button
                    className="primary"
                    onClick={exportImage}
                    disabled={!url}
                  >
                    Export Image
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
  }
