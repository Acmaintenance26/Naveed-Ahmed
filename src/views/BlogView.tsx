import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blog';
import { BlogPost, PageId } from '../types';
import { BUSINESS_CONFIG } from '../data/config';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  CheckCircle2,
  X,
  Share2,
  MessageSquare,
  AlertCircle,
  Tag,
  ShieldCheck
} from 'lucide-react';

interface BlogViewProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigateToService?: (serviceSlug: PageId) => void;
  onNavigateToQuote: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onOpenBooking,
  onNavigateToService,
  onNavigateToQuote
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    'All',
    'Deep Cleaning',
    'Dubai Living',
    'Tips & Guides',
    'Commercial',
    'AC & Air Quality'
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const handleOpenArticle = (post: BlogPost) => {
    setActivePost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setActivePost(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#0A1E3A] via-[#0F2F57] to-[#00A896] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-white/20">
            <BookOpen className="w-3.5 h-3.5" />
            Dubai Cleaning Insights & Guides
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Expert Cleaning & Hygiene Blog
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Practical advice on desert dust management, tenancy handover checklists, indoor air quality, and commercial sanitization standards in Dubai.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides (e.g. sandstorm, deposit, sofa, office, villa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm shadow-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* Prominent Pricing Notice Banner */}
      <section className="bg-amber-50 border-b border-amber-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2.5 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Notice on Pricing:</strong> All prices mentioned in our guides and catalog are starting baseline estimates and are not fixed. Final rates will vary and change based on property size, layout, condition, and custom requirements.
            </span>
          </div>
          <button
            onClick={onNavigateToQuote}
            className="text-cyan-800 hover:text-cyan-900 font-bold underline shrink-0 cursor-pointer"
          >
            Get an exact custom quote →
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* If an article is active in modal reader view */}
        {activePost ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-16 animate-in fade-in duration-200">
            {/* Modal Header Bar */}
            <div className="bg-slate-900 text-white p-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
              <button
                onClick={handleCloseArticle}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>← Back to All Articles</span>
              </button>
              <button
                onClick={handleCloseArticle}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content Container */}
            <div className="p-6 sm:p-10 lg:p-14 max-w-4xl mx-auto space-y-8">
              {/* Category & Metadata */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider">
                    {activePost.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {activePost.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {activePost.publishedDate}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A1E3A] tracking-tight leading-tight">
                  {activePost.title}
                </h1>

                {/* Author Card */}
                <div className="flex items-center gap-3 pt-2 pb-4 border-b border-slate-100">
                  <img
                    src={activePost.author.avatar}
                    alt={activePost.author.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">
                      {activePost.author.name}
                    </div>
                    <div className="text-xs text-slate-500">{activePost.author.role}</div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-slate-100 shadow-md">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Intro Paragraph */}
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                {activePost.content.intro}
              </p>

              {/* Article Sections */}
              <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
                {activePost.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0A1E3A] tracking-tight">
                      {sec.heading}
                    </h2>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {sec.keyTakeaway && (
                      <div className="bg-cyan-50/80 border-l-4 border-cyan-600 p-4 rounded-r-xl my-3 text-xs sm:text-sm text-cyan-950 font-medium flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                        <div>
                          <strong>Key Takeaway:</strong> {sec.keyTakeaway}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Important Pricing Transparency Callout inside article */}
                <div className="bg-amber-50/90 rounded-2xl p-5 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>AL Naveed Pricing Transparency Notice</span>
                  </div>
                  <p className="text-slate-700">
                    Please note that all pricing mentioned across our articles, guides, and packages are starting baseline estimates and are not fixed. Every property in Dubai possesses unique dimensions, floor layouts, ceiling heights, and levels of soiling. Final quotes are confirmed after property details are reviewed or inspected with zero unexpected charges.
                  </p>
                </div>

                {/* Conclusion */}
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-[#0A1E3A] mb-2">Summary</h3>
                  <p className="text-slate-600 leading-relaxed">{activePost.content.conclusion}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Tags:
                </span>
                {activePost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Service Recommendation & Booking Call to Action */}
              <div className="bg-gradient-to-br from-[#0F2F57] to-[#0A1E3A] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" /> Professional Help in Dubai
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Need Professional Cleaning for Your Dubai Property?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                    AL Naveed deploys vetted, licensed crews across all Dubai residential and commercial districts. Same-day bookings available!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onOpenBooking(activePost.relatedServiceSlug);
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-[#00A896] hover:from-cyan-300 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-900" />
                    Book Cleaning
                  </button>

                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Hello AL Naveed! I was reading your article "${activePost.title}" and would like to ask about cleaning services in Dubai.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Ask via WhatsApp
                  </a>
                </div>
              </div>

              {/* Bottom Back Button */}
              <div className="text-center pt-4">
                <button
                  onClick={handleCloseArticle}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  ← Back to All Cleaning Articles
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Category Filtering Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F2F57] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </div>
        </div>

        {/* Featured Post Card (Only shown if 'All' is selected and no search) */}
        {selectedCategory === 'All' && !searchQuery && !activePost && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-12 grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-slate-100">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Dubai Guide
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="text-cyan-700 font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.publishedDate}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1E3A] group-hover:text-cyan-700 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featuredPost.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{featuredPost.author.name}</div>
                    <div className="text-[11px] text-slate-500">{featuredPost.author.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenArticle(featuredPost)}
                  className="px-4 py-2 rounded-xl bg-[#0F2F57] hover:bg-[#00A896] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No cleaning articles found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any articles matching "{searchQuery}". Try selecting another category or resetting your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#0F2F57] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-600" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishedDate}</span>
                    </div>

                    <h3
                      onClick={() => handleOpenArticle(post)}
                      className="text-lg font-bold text-[#0A1E3A] group-hover:text-cyan-700 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
                        {post.author.name}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenArticle(post)}
                      className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Global Pricing Information Box */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="text-lg font-bold text-[#0A1E3A]">
                Transparent Cleaning Pricing Across Dubai
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All prices and rate cards displayed on this website are <strong>starting estimates and are not fixed</strong>. Final pricing will be determined and confirmed based on your property's actual layout, square footage, initial cleanliness condition, and customized service selections. We provide complete itemized transparency with zero hidden charges.
              </p>
            </div>
            <button
              onClick={onNavigateToQuote}
              className="px-5 py-2.5 rounded-xl bg-[#0F2F57] hover:bg-[#00A896] text-white font-bold text-xs shadow-md transition-colors shrink-0 cursor-pointer"
            >
              Calculate Your Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
