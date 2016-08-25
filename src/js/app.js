$(".sandbox").hide();
$(".sandbox:first").show();
$("section").on("click", "h5", function() {
    $(this).closest("section").siblings().find(".sandbox").slideUp(200);
    $(this).next().slideToggle(200);
});