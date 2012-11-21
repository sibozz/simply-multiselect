/*
 * Jquery Simply-MultiSelect v.0.1
 * Author : Mawaddi Rachman
 * Email : mawaddi.rachman@gmail.com
 * YM : adi_bujang@yahoo.com
 * Date : 16/11/2012
 */
(function( $ ){
  $.fn.simplyMultiSelect = function(options) {
		if(!this.length) return this;
		var self = this;
		var values = {};
		this.opt = {
			'open': 'Open',
			'close': 'Close',
			'name': 'pilih',
			'title': 'Pilih Dong',
			'element': 'elementPilih',
			'size': 40,
			'value': {},
			'label': {},
			'checked': {}
		}
		
		this.opt = $.extend(this.opt, options);
		
		var buildTag = function(tag, html, attrs){
			if(typeof(html) != "string"){
				attrs = html;
				html == null;
				label = html.label;
				type = html.type;
			}
			var h = "<"+tag;
			for(attr in attrs){
				if(attrs[attr] == false || attr=="label" || attrs[attr]=="href") continue;
				h += " "+attr+"='"+attrs[attr]+"'";
			}
			
			if(typeof type!="undefined")
			{
				label = (typeof label!="undefined") ? label : html;
				switch(type)
				{
					case 'text': h += " />"; break;
					case 'button': h += " />"; break;
					case 'checkbox': h += " /> " + label; break;
					case 'href': h += " >" + label + "</"+tag+">"; break;
				}
			}
			return h;
		}
		
		var createElement = function(data){
			var titleElement = buildTag("input", {name: data.element+"_area", type: "text", value: data.title, size: data.size, readonly: "readonly"});
			var openButton = buildTag("input", {name: data.element+"_open", type: "button", value: data.open});
			var closeButton = buildTag("input", {name: data.element+"_close", type: "button", value: data.close});
			var checkAll = buildTag("a", {id: data.element+"_chkAll", type: "href", href: "javascript:;", label: "Check All"});
			var uncheckAll = buildTag("a", {id: data.element+"_unchkAll", type: "href", href: "javascript:;", label: "Uncheck All"});
			
			var itemElement = "<ul>";
			var items = data.value;
			var itemLabels = data.label;
			var itemChecked = data.checked;
			var next = [];
			if(items.length > 0)
				for(var item=0;item<items.length;item++)
				{
					if(itemChecked.length > 0)
					{
						for(var x=0;x<itemChecked.length;x++)
						{
							if(itemChecked[x] == items[item])
							{
								next[item] = itemChecked[x];
								itemElement += "<li>"+buildTag("input", {name: data.element+"[]" , type: "checkbox", value: items[item], label: itemLabels[item], ref:itemLabels[item], checked: "checked"})+"</li>";
							}
							else continue;
						}
					}
					if(next[item] != items[item])
						itemElement += "<li>"+buildTag("input", {name: data.element+"[]" , type: "checkbox", value: items[item], label: itemLabels[item], ref:itemLabels[item]})+"</li>";
				}
			itemElement += "</ul>";
			
			var drawElement = "<div class='simply-multiSelect'>";
			drawElement += "<div class='simply-multiSelect-area'>"+titleElement+"<div class='simply-multiselect-open'>"+openButton+"</div>"+"</div>";
			drawElement += "<div class='simply-multiSelect-row' id='"+data.element+"_row'>";
			drawElement += "<div class='simply-multiSelect-item' id='"+data.element+"_item'>"+itemElement+"</div>";
			drawElement += "<span class='simply-multiSelect-chk'>"+checkAll+"</span>";
			drawElement += "<span class='simply-multiSelect-chk'> | </span>";
			drawElement += "<span class='simply-multiSelect-chk'>"+uncheckAll+"</span>";
			drawElement += "<div class='simply-multiSelect-close'>"+closeButton+"</div></div></div>";
			return drawElement;
		}
		var element = createElement(this.opt);
		$(self).html(element);
		
		$("input[name="+this.opt.element+"_open]").bind("click", function(){
			$("input[name="+self.opt.element+"_open]").hide();
			$("#"+self.opt.element+"_row").show();
			$("input[name="+self.opt.element+"_close]").show();
		});
		
		$("input[name="+this.opt.element+"_close]").bind("click", function(){
			$("input[name="+self.opt.element+"_open]").show();
			$("#"+self.opt.element+"_row").hide();
			$("input[name="+self.opt.element+"_close]").hide();
		});
		
		$("#"+this.opt.element+"_chkAll").bind("click", function(){
			$("input[name='"+self.opt.element+"[]'][type='checkbox']").attr("checked", "checked");
			$("input[name="+self.opt.element+"_area]").val("All");
		});
		
		$("#"+this.opt.element+"_unchkAll").bind("click", function(){
			$("input[name='"+self.opt.element+"[]'][type='checkbox']").removeAttr("checked");
			$("input[name="+self.opt.element+"_area]").val(self.opt.title);
		});
		$("input[name='"+this.opt.element+"[]'][type='checkbox']").bind("click", function(){
			var MAP = [];
			var _val = [];
			$("input[name='"+self.opt.element+"[]'][type='checkbox']:checked").each(function(i,n){
				_val[i] = $(this).val();
				MAP[i] = $(this).attr("ref");
			});
			values = _val;
			if(MAP.length != self.opt.value.length)
				$("input[name="+self.opt.element+"_area]").val(MAP.join(", "));
			else
				$("input[name="+self.opt.element+"_area]").val("All");
		});
  };
})( jQuery );
